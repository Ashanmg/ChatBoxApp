using System.Threading.Tasks;
using ChatBoxApp_API.Data;
using ChatBoxApp_API.Dtos;
using ChatBoxApp_API.Models;
using Microsoft.AspNetCore.Mvc;

namespace ChatBoxApp_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepository;

        public AuthController(IAuthRepository authRepository)
        {
            this._authRepository = authRepository;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            userForRegisterDto.Username = userForRegisterDto.Username.ToLower();

            if (await _authRepository.UserExists(userForRegisterDto.Username))
            {
                return BadRequest("Username already exists");
            }

            var userToCreate = new User {
                Username = userForRegisterDto.Username
            };

            var createdUser = _authRepository.Register(userToCreate, userForRegisterDto.Password);

            return StatusCode(201);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForRegisterDto)
        {
            var userFromRepo = await _repo.Login(userForRegisterDto.Username, userForRegisterDto.Password);

            if (userFromRepo == null)
            {
                return Unauthorized();
            }

            
        }
    }
}