namespace FinalAspReactAuction.Server.Entities
{
    public class Model
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public Make Make { get; set; }
        public ICollection<Car> Cars { get; set; }
    }
}
