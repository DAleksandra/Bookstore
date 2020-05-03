namespace Bookstore.API.Models
{
    public class Filters
    {
        public string Genre { get; set; }
        public float PriceMin { get; set; }
        public float PriceMax { get; set; }
        public bool Sales { get; set; }
        public string SortBy { get; set; }
        public string BookName { get; set; }
    }
    
}