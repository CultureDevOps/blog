# Variables
$AWS_BUCKET = "culturedevops"
$LOCAL_DIR = ".\public\static\images"
$S3_DIR = "s3://$AWS_BUCKET/static/images/"

Write-Host "Synchronizing local images to S3..."

# Synchroniser les fichiers locaux vers le bucket S3
aws s3 sync $LOCAL_DIR $S3_DIR --delete
# aws s3 sync $LOCAL_DIR $S3_DIR

Write-Host "Synchronization complete!"
