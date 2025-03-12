using FinalAspReactAuction.Server.Dtos.AccountDto;
using FinalAspReactAuction.Server.Dtos.RegisterDto;
using FinalAspReactAuction.Server.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace FinalAspReactAuction.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<CustomIdentityUser> _userManager;
        private readonly RoleManager<CustomIdentityRole> _roleManager;
        private readonly SignInManager<CustomIdentityUser> _signInManager;

        public AccountController(UserManager<CustomIdentityUser> userManager,
                                 RoleManager<CustomIdentityRole> roleManager,
                                 SignInManager<CustomIdentityUser> signInManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager = signInManager;
        }

        [HttpPost("Register")]
        public async Task<ActionResult> Register([FromBody]RegisterDto dto)
        {
            var existingUser = await _userManager.FindByEmailAsync(dto.Email);
            if (existingUser != null)
            {
                return BadRequest("Email is already exist.");
            }

            CustomIdentityUser user = new CustomIdentityUser
            {
                UserName = dto.Name,
                Email = dto.Email,
            };

            IdentityResult result = await _userManager.CreateAsync(user, dto.Password);

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }
                return BadRequest(ModelState);
            }

            if (!(await _roleManager.RoleExistsAsync("Admin")))
            {
                CustomIdentityRole role = new CustomIdentityRole
                {
                    Name = "Admin"
                };

                IdentityResult roleResult = await _roleManager.CreateAsync(role);
                if (!roleResult.Succeeded)
                {
                    ModelState.AddModelError("RoleError", "We could not add the role!");
                    return BadRequest(ModelState);
                }
            }

            await _userManager.AddToRoleAsync(user, "Admin");

            return Ok(dto);
        }

        [HttpPost("Login")]
        public async Task<ActionResult> Login([FromBody] LoginDto dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);
            if (user == null)
            {
                return Unauthorized("Invalid username or password.");
            }

            var result = await _signInManager.PasswordSignInAsync(dto.Name, dto.Password, dto.RememberMe, false);
            if (result.Succeeded)
            {
                return Ok(dto);
            }
            return Unauthorized("Invalid username or password.");
        }
    }
}
