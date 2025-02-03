class ImagesController < ApplicationController
  def create
    @image = Image.new(image_params)
    authorize @image, :create?

    if params[:image][:file].present?
      @image.file.attach(params[:image][:file])
    else
      render json: { error: "Image file is required" }, status: :unprocessable_entity
      return
    end

    max_sort = Image.where(subject_id: @image.subject_id, subject_type: @image.subject_type).maximum(:sort) || 0
    @image.sort = max_sort + 1

    if @image.save
      render json: { image_url: @image.image_url }, status: :created
    else
      render json: @image.errors, status: :unprocessable_entity
    end
  end

  private

  def image_params
    params.require(:image).permit(:subject_id, :subject_type, :file, :organization_id)
  end
end
