using System;
using System.Collections.Generic;

namespace PgExplorer.Models;

public partial class City
{
    public int CityId { get; set; }

    public string CityName { get; set; } = null!;

    public virtual ICollection<Area> Areas { get; set; } = new List<Area>();
}
