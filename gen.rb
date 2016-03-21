# Require extensions explicitly if you are not in a Rails environment
require 'active_support/all'
require 'date'
require 'yaml'

# Generate the month end dates and grab the monthly statements.

obj = { 'files' => [ ] }
1.upto(12) do |i|
  d    = Date.new(2015, i, 1).end_of_month
  link = "https://www.secure.bmoinvestorline.com/ILClientWeb/client/EStatement?docDate=#{d.iso8601}&date=#{d.strftime '%m%Y'}"
  obj['files'] << { 'url' => link, 'name' => link }
  # puts d.strftime '%Y-%m-%d'
end

File.open('data/about.yml', 'w') do |h|
  h.write obj.to_yaml
end
