using Microsoft.EntityFrameworkCore.Migrations;

namespace Bookstore.API.Migrations
{
    public partial class AddOnSaleAndSalePriceToBook : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "OnSale",
                table: "Books",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<float>(
                name: "SalePrice",
                table: "Books",
                nullable: false,
                defaultValue: 0f);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OnSale",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "SalePrice",
                table: "Books");
        }
    }
}
