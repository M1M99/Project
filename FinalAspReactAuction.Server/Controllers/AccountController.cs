﻿using FinalAspReactAuction.Server.Dtos.AccountDto;
using FinalAspReactAuction.Server.Dtos.RegisterDto;
using FinalAspReactAuction.Server.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace FinalAspReactAuction.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<CustomIdentityUser> _userManager;
        private readonly RoleManager<CustomIdentityRole> _roleManager;
        private readonly SignInManager<CustomIdentityUser> _signInManager;
        private readonly IConfiguration _configuration;
        public AccountController(UserManager<CustomIdentityUser> userManager,
                                 RoleManager<CustomIdentityRole> roleManager,
                                 SignInManager<CustomIdentityUser> signInManager,
                                 IConfiguration configuration)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager = signInManager;
            _configuration = configuration;
        }

        [HttpPost("Register")]
        public async Task<ActionResult> Register([FromBody] RegisterDto dto)
        {
            var existingUser = await _userManager.FindByEmailAsync(dto.Email);
            if (existingUser != null)
            {
                return BadRequest("Email is already exist.");
            }

            var user = new CustomIdentityUser
            {
                UserName = dto.Name,
                Email = dto.Email,
            };

            var result = await _userManager.CreateAsync(user, dto.Password);

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

        [HttpPost("RegisterClient")]
        public async Task<ActionResult> RegisterClient([FromBody] RegisterDto dto)
        {
            var user = new CustomIdentityUser
            {
                UserName = dto.Name,
                Email = dto.Email,
            };
            var newUser = await _userManager.CreateAsync(user, dto.Password);

            if (newUser.Succeeded)
            {
                if (!await _roleManager.RoleExistsAsync("Client"))
                {
                    await _roleManager.CreateAsync(new CustomIdentityRole
                    {
                        Name = "Client"
                    });

                    await _userManager.AddToRoleAsync(user, "Client");
                    return Ok();
                }
            }
            return BadRequest(new { Status = "Error", Message = "User creation failed!", Errors = newUser.Errors });
        }

        [HttpPost("Login")]
        public async Task<ActionResult> Login([FromBody] LoginDto dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);
            if (user == null)
            {
                return Unauthorized("Invalid username or password.");
            }

            var userRoles = await _userManager.GetRolesAsync(user);

            var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name,user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),
                };

            foreach (var role in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, role));
            }

            var token = GetToken(authClaims);
            return Ok(new
            {
                Token = new JwtSecurityTokenHandler().
                WriteToken(token),
                Expiration = token.ValidTo,
                Role = _userManager.GetRolesAsync(user)
            });
        }
        private JwtSecurityToken GetToken(List<Claim> authClaims)
        {
            var authSigninKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Issuer"],
                expires: DateTime.Now.AddHours(3),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigninKey, SecurityAlgorithms.HmacSha256)
                );

            return token;
        }

    }
}
