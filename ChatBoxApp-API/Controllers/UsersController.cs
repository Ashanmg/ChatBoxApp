using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using ChatBoxApp_API.Data;
using ChatBoxApp_API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly IDatingRepository _datingRepository;
    private readonly IMapper _mapper;
    public UsersController(IDatingRepository datingRepository, IMapper mapper)
    {
        this._mapper = mapper;
        this._datingRepository = datingRepository;

    }

    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
        var users = await _datingRepository.GetUsers();

        var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);
        
        return Ok(usersToReturn);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser(int id)
    {
        var user = await _datingRepository.GetUser(id);

        var userToRetrun = _mapper.Map<UserForDetailDto>(user);
        
        return Ok(userToRetrun);
    }
    
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(int id, UserForUpdateDto userForUpdateDto)
    {
        if ( id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
        {
            return Unauthorized();
        }

        var userFromRepo = await _datingRepository.GetUser(id);

        _mapper.Map(userForUpdateDto, userFromRepo);

        if (await _datingRepository.SaveAll())
        {
            return NoContent();
        }

        throw new Exception($"Updating user {id} failed on save");
    }
}