#!/bin/bash
echo "Creating a .env file"
cd ${APPCENTER_SOURCE_DIRECTORY}
echo "API_URL: ${API_URL}"
echo "API_URL=${API_URL}" > .env
