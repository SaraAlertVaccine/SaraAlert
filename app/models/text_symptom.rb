# frozen_string_literal: true

# TextSymptom: a symptom that contains text
class TextSymptom < Symptom
  def value
    text_value
  end

  def value=(value)
    self.text_value = value
  end

  def as_json(options = {})
    super(options).merge({
                           value: text_value
                         })
  end
end
