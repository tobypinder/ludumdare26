# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
Position.transaction do
  (-30..30).each do |x|
    print "#{x.to_s.rjust(3,' ')}:"
    (-30..30).each do |y|
      Position.find_or_create_by_x_and_y(x,y)
      print '.'
    end 
    print "\n"
  end  
end