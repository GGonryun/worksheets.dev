#!/bin/bash

if [ ! -f .env ] 
then
  export $(cat .env.local | xargs)
fi