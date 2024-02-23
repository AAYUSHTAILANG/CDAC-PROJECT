namespace PgExplorer.Models
{
    public class PropertyApprovalModel
    {
        public string Name { get; set; }
        public int AreaId { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Capacity { get; set; }
        public int NumberOfOccupants { get; set; }
        public int CityId { get; set; }
        public int OwnerId { get; set; }
    }
}
