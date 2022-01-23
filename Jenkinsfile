// pipeline {
//     agent { docker { image 'node:14-alpine' } }
//     stages {
//         stage('build') {
//             steps {
//                 sh 'npm --version'
//             }
//         }
//     }
// }
pipeline {
  agent any
  tools {nodejs "nodejs"}
  
   stages {
    stage('Install') {
      steps { sh 'npm install' }
    }
    stage('Unit tests') {
        steps { sh 'npm run-script test' }
    }
    stage('Build') {
      steps {
        sh 'npm run-script build' }
    }
    
  }
}