<<<<<<< HEAD
pipeline {
    agent { docker { image 'node:14-alpine' } }
    stages {
        stage('build') {
            steps {
                sh 'npm --version'
            }
        }
    }
=======
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
>>>>>>> df767b096fc61989308c62f577ca999f7f6f15b3
}