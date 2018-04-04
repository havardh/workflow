cd packages/workflow-core
yarn link
cd ../../

pushd packages/workflow-react
yarn link
yarn link workflow-core
cd ../../
