class Api::V1::FavoriteSerializer
  include FastJsonapi::ObjectSerializer

  attribute :id do |object|
    object.favoritable.id
  end

  attribute :type do |object|
    object.favoritable_type
  end

  attribute :title do |object|
    object.favoritable.title
  end

  attribute :description do |object|
    object.favoritable.description
  end

  attribute :thunail_url do |object|
    "/thumbnails/#{object.favoritable.thumbnail_key}"
  end
end
