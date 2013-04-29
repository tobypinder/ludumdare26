namespace :game do
  desc 'Spawn'
  task :spawn => :environment do 
    Position.all.each do |p|
      rng=Random.new()
      if(rng.rand(1..5) == 1)
        e = Enemy.make(p)
        e.save
      else
      end
    end
  end
end