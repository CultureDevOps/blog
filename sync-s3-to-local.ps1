# Variables
$AWS_BUCKET = "culturedevops"
$LOCAL_DIR = ".\public\static\images"
$S3_DIR = "s3://$AWS_BUCKET/static/images/"

Write-Host "Synchronizing S3 images to local..."

# Synchroniser les fichiers locaux vers le bucket S3
#aws s3 sync $S3_DIR $LOCAL_DIR --delete
aws s3 sync $S3_DIR $LOCAL_DIR

Write-Host "Synchronization complete!"
