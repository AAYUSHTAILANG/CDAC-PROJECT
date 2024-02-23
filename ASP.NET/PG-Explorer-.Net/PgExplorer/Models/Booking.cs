using System;
using System.Collections.Generic;

namespace PgExplorer.Models;

public partial class Booking
{
    public int Id { get; set; }

    public int? OccupantId { get; set; }

    public int? PropertyId { get; set; }

    public string? Date { get; set; }

    public string? Deposit { get; set; }

    public string TransactionId { get; set; } = null!;

    public DateOnly? From { get; set; }

    public DateOnly? ToApprox { get; set; }

    public virtual Occupant? Occupant { get; set; }

    public virtual Property? Property { get; set; }
}
