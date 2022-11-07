resource "aws_budgets_budget" "budget" {
  name = "${var.appName}-budget-free"
  budget_type = "COST"
  limit_amount = 0.01
  limit_unit = "USD"
  time_unit = "MONTHLY"
}
