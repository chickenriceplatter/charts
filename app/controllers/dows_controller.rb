class DowsController < ApplicationController

  def chart
    @companies = Dow.all
  end

end
