pipeline {
  agent {
     label 'windows'
  }
    options{
        buildDiscarder logRotator(artifactDaysToKeepStr: '',  artifactNumToKeepStr: '5',  daysToKeepStr: '', numToKeepStr: '5')
        disableConcurrentBuilds()
  stages {
    stage('Install') {
      steps { sh 'npm install' }
    }

    stage('Test') {
      parallel {
        stage('Static code analysis') {
            steps { sh 'npm run-script lint' }
        }
        stage('Unit tests') {
            steps { sh 'npm run-script test' }
        }
      }
    }

    stage('Build') {
      steps { sh 'npm run-script build' }
    }
  }
}
