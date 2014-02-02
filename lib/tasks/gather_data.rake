namespace :gather_data do

  desc "populate fortune 500 table"
  task :fortune_500 => :environment do

    infile = "/Users/dave/data/Fortune-500-Year-2013-List.csv"

    string = File.read(infile)

    array = string.split("\n")
    array.map!{ |element| element.split(",") }

    array.each do |company|

      puts company[1]

      f = Fortune500.new
      f.name = company[1].downcase
      f.revenue_in_billions = company[2].to_f
      f.profit_in_millions = company.last.to_f
      f.save!
    end

  end

  desc "populate dow table"
  task :dow => :environment do

    Dow.all.each do |company|

      symbol = company.symbol

      puts symbol

      f = Fortune500.where(:symbol => symbol).first

      company.revenue = f.revenue_in_billions * 1000
      company.profit = f.profit_in_millions
      company.name = f.name

      company.save!

    end

  end

end
