
cd packages/workflow-cmd
yarn
cd ../..

cd packages/workflow-core
yarn
yarn link
cd ../..

cd packages/workflow-react
yarn
yarn link
yarn link workflow-core
cd ../..
