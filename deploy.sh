echo "Deleting files in s3"
aws s3 rm s3://gameoflifeproject --recursive

echo "Uploading files:"
aws s3 sync ./dist/game-of-life s3://gameoflifeproject