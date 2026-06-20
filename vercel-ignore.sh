#!/bin/bash

echo "Checking deployment branch: $VERCEL_GIT_COMMIT_REF"

if [ "$VERCEL_GIT_COMMIT_REF" == "main" ] ; then
  # Proceed with the build
  echo "✅ Main branch detected. Proceeding..."
  exit 1
else
  # Don't build
  echo "🛑 Not the main branch. Canceling build."
  exit 0
fi