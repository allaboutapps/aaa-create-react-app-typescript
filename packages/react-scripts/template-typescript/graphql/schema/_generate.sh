#!/bin/bash
# Generates TypeScript schemas from graphql queries
# Automatically introspecs schema to validate queries
touch _queries.gql
echo -n > _queries.gql

for file in $(find ../../src -name '*.gql')
do
  echo "Appending gql query ${file}"
  cat $file >> _queries.gql
  echo $'\n' >> _queries.gql
done

# Check if the "apollo-codegen" command is available.
if ! type "./../../node_modules/.bin/apollo-codegen" &> /dev/null; then
  echo $'\nThe "apollo-codegen" command could not be found.\nTry "yarn add apollo-codegen" and then try again.\n'
  exit 1
fi

# Generate the typings.
./../../node_modules/.bin/apollo-codegen generate _queries.gql --schema schema.json --target typescript --output "../../src/IGQLQueries.d.ts"

# Check if generating the typings succeeded.
if [ $? -eq 0 ]; then
    sed -i -e 's/};/}/g' "../../src/IGQLQueries.d.ts"
    echo "Generated typings IQueries.d.ts."
else
    echo "An error occurred while generating typings."
    exit 1
fi
