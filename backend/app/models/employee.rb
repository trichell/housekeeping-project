class Employee < ApplicationRecord
  validates :name, presence: true
  validates :gender, presence: true
  validates :price, presence: true
  validates :group, presence: true
  validates :custom_id, uniqueness: true, allow_nil: true

  before_create :set_custom_id

  private

  def set_custom_id
    prefix = case group
             when 'Housekeeping Employee' then 'HSK'
             when 'Pet Caretaker Employee' then 'PCT'
             when 'Babysitter Employee' then 'BYS'
             when 'Security Employee' then 'SEC'
             when 'Movers Employee' then 'MOV'
             else 'EMP'
             end

    count = Employee.where(group: group).where.not(custom_id: nil).count + 1
    self.custom_id = "#{prefix}-#{format('%03d', count)}"
  end
end
