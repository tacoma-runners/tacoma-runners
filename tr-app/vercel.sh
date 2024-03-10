#!/bin/bash
 
if [[ $VERCEL_ENV == "production"  ]] ; then 
  ng build --configuration=production
else 
  ng build --configuration=staging
fi