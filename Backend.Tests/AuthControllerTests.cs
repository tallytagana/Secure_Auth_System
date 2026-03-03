using System.Security.Claims;
using Backend.Controllers;
using Backend.Data;
using Backend.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Moq;
using Xunit;

namespace Backend.Tests
{
    public class AuthControllerTests
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthControllerTests()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;
            _context = new ApplicationDbContext(options);

            var inMemorySettings = new Dictionary<string, string> {
                {"Jwt:Key", "testing_key_long_enough_32_chars_long"},
                {"Jwt:Issuer", "test-issuer"},
                {"Jwt:Audience", "test-audience"}
            };
            _configuration = new ConfigurationBuilder()
                .AddInMemoryCollection(inMemorySettings)
                .Build();
        }

        [Fact]
        public async Task Register_ReturnsOk_WhenValidData()
        {
            // Arrange
            var controller = new AuthController(_context, _configuration);
            var dto = new RegisterDto("John", "Doe", "john@example.com", "password123");

            // Act
            var result = await controller.Register(dto);

            // Assert
            var actionResult = Assert.IsType<ActionResult<AuthResponseDto>>(result);
            var value = Assert.IsType<AuthResponseDto>(actionResult.Value);
            Assert.Equal("john@example.com", value.User.Email);
        }

        [Fact]
        public async Task Login_ReturnsUnauthorized_WhenWrongPassword()
        {
            // Arrange
            var controller = new AuthController(_context, _configuration);
            var registerDto = new RegisterDto("John", "Doe", "john2@example.com", "password123");
            await controller.Register(registerDto);

            var loginDto = new LoginDto("john2@example.com", "wrongpassword");

            // Act
            var result = await controller.Login(loginDto);

            // Assert
            Assert.IsType<UnauthorizedObjectResult>(result.Result);
        }

        [Fact]
        public async Task GetUserDetails_ReturnsOk_WhenAuthorized()
        {
            // Arrange
            var controller = new AuthController(_context, _configuration);
            var registerDto = new RegisterDto("John", "Doe", "john3@example.com", "password123");
            await controller.Register(registerDto);

            // Mock User Claims
            var claims = new List<Claim> { new Claim(ClaimTypes.Email, "john3@example.com") };
            var identity = new ClaimsIdentity(claims, "TestAuthType");
            var claimsPrincipal = new ClaimsPrincipal(identity);
            controller.ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext { User = claimsPrincipal }
            };

            // Act
            var result = await controller.GetUserDetails();

            // Assert
            var actionResult = Assert.IsType<ActionResult<UserDetailsDto>>(result);
            var value = Assert.IsType<UserDetailsDto>(actionResult.Value);
            Assert.Equal("john3@example.com", value.Email);
        }
    }
}
