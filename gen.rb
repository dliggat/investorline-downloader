# Require extensions explicitly if you are not in a Rails environment
require 'active_support/all'
require 'date'

1.upto(12) do |i|
  d = Date.new(2015, i, 1).end_of_month
  puts d.strftime '%Y-%m-%d'
end
