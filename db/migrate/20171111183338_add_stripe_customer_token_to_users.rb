class AddStripeCustomerTokenToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :strip_customer_token, :string
  end
end
