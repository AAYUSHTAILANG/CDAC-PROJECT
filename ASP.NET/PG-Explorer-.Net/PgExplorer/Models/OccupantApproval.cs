using System;
using System.Collections.Generic;

namespace PgExplorer.Models;

public partial class OccupantApproval
{
    public int Id { get; set; }

    public int? OccupantId { get; set; }

    public int? PropertyId { get; set; }

    public int? ApprovalStatus { get; set; }

    public string? RequestDate { get; set; }

    public virtual Occupant? Occupant { get; set; }

    public virtual Property? Property { get; set; }
}
