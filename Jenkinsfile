pipeline {
  agent any
  tools {nodejs "nodejs"}
  
   stages {
    stage('Install') {
      steps { sh 'npm install' }
    }
     
     stage('Test') {
      parallel {
        stage('Unit tests') {
            steps { sh 'npm run-script test' }
        }
      }
    }

    stage('Build') {
      steps {
        sh 'npm run-script build' }
    }
    
  }
}
