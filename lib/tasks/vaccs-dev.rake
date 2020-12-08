# frozen_string_literal: true
# bundle exec rails vaccs:users

namespace :vaccs do
  desc 'Configure the database for demo use'
  task users: :environment do
    raise 'This task is only for use in a development environment' unless Rails.env == 'development' || ENV['DISABLE_DATABASE_ENVIRONMENT_CHECK']

    #####################################

    print 'Gathering jurisdictions...'

    jurisdictions = {}
    jurisdictions[:six_eight_eight] = Jurisdiction.where(name: '688').first

    if jurisdictions.has_value?(nil)
      puts ' Demonstration jurisdictions were not found! Make sure to run `bundle exec rake admin:import_or_update_jurisdictions` with the demonstration jurisdictions.yml'
      exit(1)
    end

    puts ' done!'

    #####################################

    print 'Creating public health enroller users...'

    User.create(email: 'jkufro@mitre.org', password: '1234567ab!', role: Roles::PUBLIC_HEALTH_ENROLLER, jurisdiction: jurisdictions[:six_eight_eight], force_password_change: false, authy_enabled: false, authy_enforced: false, api_enabled: true)
    User.create(email: 'forbes@mitre.org', password: '1234567ab!', role: Roles::PUBLIC_HEALTH_ENROLLER, jurisdiction: jurisdictions[:six_eight_eight], force_password_change: false, authy_enabled: false, authy_enforced: false, api_enabled: true)
    User.create(email: 'cqduong@mitre.org', password: '1234567ab!', role: Roles::PUBLIC_HEALTH_ENROLLER, jurisdiction: jurisdictions[:six_eight_eight], force_password_change: false, authy_enabled: false, authy_enforced: false, api_enabled: true)
    User.create(email: 'ksheridan@mitre.org', password: '1234567ab!', role: Roles::PUBLIC_HEALTH_ENROLLER, jurisdiction: jurisdictions[:six_eight_eight], force_password_change: false, authy_enabled: false, authy_enforced: false, api_enabled: true)
    User.create(email: 'kevins@mitre.org', password: '1234567ab!', role: Roles::PUBLIC_HEALTH_ENROLLER, jurisdiction: jurisdictions[:six_eight_eight], force_password_change: false, authy_enabled: false, authy_enforced: false, api_enabled: true)
    User.create(email: 'dcphillips@mitre.org', password: '1234567ab!', role: Roles::PUBLIC_HEALTH_ENROLLER, jurisdiction: jurisdictions[:six_eight_eight], force_password_change: false, authy_enabled: false, authy_enforced: false, api_enabled: true)
    User.create(email: 'mlingelbach@mitre.org', password: '1234567ab!', role: Roles::PUBLIC_HEALTH_ENROLLER, jurisdiction: jurisdictions[:six_eight_eight], force_password_change: false, authy_enabled: false, authy_enforced: false, api_enabled: true)
    User.create(email: 'ecanzone@mitre.org', password: '1234567ab!', role: Roles::PUBLIC_HEALTH_ENROLLER, jurisdiction: jurisdictions[:six_eight_eight], force_password_change: false, authy_enabled: false, authy_enforced: false, api_enabled: true)
    User.create(email: 'cbezold@mitre.org', password: '1234567ab!', role: Roles::PUBLIC_HEALTH_ENROLLER, jurisdiction: jurisdictions[:six_eight_eight], force_password_change: false, authy_enabled: false, authy_enforced: false, api_enabled: true)
    User.create(email: 'lberko@mitre.org', password: '1234567ab!', role: Roles::PUBLIC_HEALTH_ENROLLER, jurisdiction: jurisdictions[:six_eight_eight], force_password_change: false, authy_enabled: false, authy_enforced: false, api_enabled: true)
    User.create(email: 'suzette@mitre.org', password: '1234567ab!', role: Roles::PUBLIC_HEALTH_ENROLLER, jurisdiction: jurisdictions[:six_eight_eight], force_password_change: false, authy_enabled: false, authy_enforced: false, api_enabled: true)
    User.create(email: 'bahier@mitre.org', password: '1234567ab!', role: Roles::PUBLIC_HEALTH_ENROLLER, jurisdiction: jurisdictions[:six_eight_eight], force_password_change: false, authy_enabled: false, authy_enforced: false, api_enabled: true)
    User.create(email: 'aouyang@mitre.org', password: '1234567ab!', role: Roles::PUBLIC_HEALTH_ENROLLER, jurisdiction: jurisdictions[:six_eight_eight], force_password_change: false, authy_enabled: false, authy_enforced: false, api_enabled: true)

    puts ' done!'

    #####################################
  end
end