using ChatBox_API.Models;
using Microsoft.EntityFrameworkCore;

namespace ChatBox_API.Data
{
    public class DataContext : DbContext
    {
        protected DataContext(DbContextOptions<DataContext> options) : base(options) {}
        public DbSet<Value> Values { get; set; }
    }
}