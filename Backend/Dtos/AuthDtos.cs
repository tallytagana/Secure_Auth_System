namespace Backend.Dtos
{
    public record RegisterDto(string FirstName, string LastName, string Email, string Password);
    public record LoginDto(string Email, string Password);
    public record UserDetailsDto(string FirstName, string LastName, string Email);
    public record AuthResponseDto(string Token, UserDetailsDto User);
}
