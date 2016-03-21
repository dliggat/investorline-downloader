require 'yaml'

# Do a regex scan to find the links of the correct form of the trading documents in HTML source.

a = File.read('/Users/dliggat/Downloads/dump.html')

items = a.scan /\/ILClientWeb\/client\/EConfirm\?id=\d{8,}&amp;type=C&amp;date=\d\d\d\d-\d\d-\d\d/
items = items.map { |c| c.gsub('amp;', '') }
             .map { |c| "https://www.secure.bmoinvestorline.com#{c}" }


obj = { 'files' => [ ] }
items.each do |c|
  obj['files'] << { 'url' => c, 'name' => c }
end

File.open('data/about.yml', 'w') do |h|
  h.write obj.to_yaml
end



