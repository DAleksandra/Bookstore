using Microsoft.EntityFrameworkCore.Migrations;

namespace Bookstore.API.Migrations
{
    public partial class SaledNumberToBook : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            

            migrationBuilder.AddColumn<int>(
                name: "Saled",
                table: "Books",
                nullable: false,
                defaultValue: 0);

            
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
           
        }
    }
}
