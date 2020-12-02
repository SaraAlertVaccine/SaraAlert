# frozen_string_literal: true

require 'test_case'

class TextSymptomTest < ActiveSupport::TestCase
  def setup; end

  def teardown; end

  test 'create text symptom' do
    string = 'v' * 200
    assert create(:text_symptom)
    assert create(:text_symptom, name: string, label: string, notes: string)

    assert_raises(ActiveRecord::RecordInvalid) do
      create(:text_symptom, name: string << 'v')
    end

    assert_raises(ActiveRecord::RecordInvalid) do
      create(:text_symptom, notes: string)
    end

    assert_raises(ActiveRecord::RecordInvalid) do
      create(:text_symptom, label: string)
    end

    assert_raises(ActiveRecord::RecordInvalid) do
      create(:text_symptom, text_value: string << 'v')
    end

    symptom = build(:text_symptom)
    symptom.text_value = nil
    assert symptom.save!
  end

  test 'get value' do
    symptom = create(:text_symptom)
    assert_equal symptom.text_value, symptom.value
  end

  test 'set value' do
    symptom = create(:text_symptom)
    symptom.value = 'test'
    assert_equal symptom.text_value, symptom.value
    assert_equal 'test', symptom.value
    assert_equal 'test', symptom.text_value
  end

  test 'text symptom as json' do
    symptom = create(:text_symptom)
    assert_includes symptom.to_json, 'text_value'
    assert_includes symptom.to_json, symptom.text_value.to_s
  end

  test 'text symptom bool based prompt' do
    symptom = create(
      :text_symptom,
      text_value: '',
      threshold_operator: 'Not Equal',
      name: 'additional-symptoms-not-mentioned-here',
      label: 'Additional Symptoms not Mentioned Here'
    )
    assert_equal symptom.bool_based_prompt, 'Experience Any Symptoms that are not mentioned here'
    symptom.threshold_operator = 'Equal'
    assert_equal symptom.bool_based_prompt, 'Not experience Any Symptoms that are not mentioned here'
  end
end
