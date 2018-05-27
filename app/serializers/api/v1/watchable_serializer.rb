class Api::V1::WatchableSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :title, :description

  attribute :type do |object|
    object.model_name
  end

  attribute :favorite do |object, params|
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

  attribute :video_url do |object|
    if object[:video_key].present?
      "/videos/#{object.video_key}"
    end
  end

  attribute :featured_thumbnail_url do |object|
    if object[:featured_thumbnail_key].present?
      "/thumbnails/#{object.featured_thumbnail_key}"
    end
  end
end