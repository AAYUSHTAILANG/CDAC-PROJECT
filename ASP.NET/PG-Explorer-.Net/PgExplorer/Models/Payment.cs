using System;
using System.Collections.Generic;

namespace PgExplorer.Models;

public partial class Payment
{
    public int Id { get; set; }

    public int? OccId { get; set; }

    public int? BookingId { get; set; }

    public int? Amount { get; set; }

    public DateOnly? Date { get; set; }

    public string? Mode { get; set; }

    public string? TransactionId { get; set; }
}
