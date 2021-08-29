#!/bin/bash
echo "Creating a .env file"
cd ${APPCENTER_SOURCE_DIRECTORY}
echo "API_URL: ${API_URL}"
echo "SENTRY_DSN: ${SENTRY_DSN}"
echo "API_URL=${API_URL}" > .env
echo "SENTRY_DSN=${SENTRY_DSN}" > .env
