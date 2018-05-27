class Api::V1::SerieSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :title, :description, thumbnail_key, featured_thumbnail_key
  has_many :episodes, record_type: :movies, serializer: :movie

  attribute :type do |object|
    'serie'
  end

  attribute :category do |object|
    object.category.name
  end

  attribute :last_watched_episode do |object|
    object.last_watched_episode_id
  end

  attribute :reviews_count do |object|
    object.reviews.count
  end

  attribute :favorite do |object|
    if params.present? && params.has_key?(:user)
      params[:user].favorites.where(favoritable: object).exists?
    end
  end

  attribute :thumbnail_url do |object|
    "/thumbnails/#{object.thumbnail_key}"
  end

  attribute :thumbnail_cover_url do |object|
    "/thumbnails/#{object.thumbnail_cover_key}"
  end

  attribute :featured_thumbnail_url do |object|
    if object[:featured_thumbnail_key​].present?
      "/videos/#{object.video_key}"
    end
  end
end
