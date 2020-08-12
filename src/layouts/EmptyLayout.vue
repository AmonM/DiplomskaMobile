<template>
  <q-layout>
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="arrow_back"
          aria-label="Menu"
          @click="
            title = '';
            $router.go(-1);
          "
        />

        <q-toolbar-title class="title">
          {{ title }}
        </q-toolbar-title>

        <q-btn
          flat
          dense
          round
          icon="refresh"
          aria-label="Menu"
          @click="refresh()"
        />
        <q-btn
          v-if="this.$route.path != '/chart'"
          flat
          dense
          round
          icon="save"
          aria-label="Menu"
          @click="downloadFile()"
        />
      </q-toolbar>
    </q-header>
    <q-page-container class="content">
      <router-view style="height:10%" />
    </q-page-container>
  </q-layout>
</template>

<script>
import { saveAs } from "file-saver";

export default {
  name: "EmptyLayout",
  components: {},
  data() {
    return {
      filePath: undefined
    };
  },
  created() {},
  methods: {
    downloadFile() {
      this.$axios({
        url: `/getData?expID=${this.$store.state.SelectedExp.Exp.id}&download`,
        method: "GET",
        responseType: "blob" // important
      })
        .then(response => {
          var filename = response.request
            .getResponseHeader("Content-Disposition")
            .split('"')[1];
          var blob = new Blob([response.data], { type: response.data.type });
          if (window.cordova && cordova.platformId !== "browser") {
            var storageLocation = "";
            switch (this.$q.platform.is.platform) {
              case "android":
                storageLocation = cordova.file.externalDataDirectory;
                break;

              case "ios":
                storageLocation = cordova.file.documentsDirectory;
                break;
            }

            var folderPath = storageLocation;

            window.resolveLocalFileSystemURL(
              folderPath,
              function(dir) {
                dir.getFile(
                  filename,
                  {
                    create: true
                  },
                  function(file) {
                    console.log(file)
                    file.createWriter(
                      function(fileWriter) {
                        fileWriter.write(blob);

                        fileWriter.onwriteend = function() {
                          var url = file.toURL();
                          console.log(file.toURL()+"");
                          cordova.plugins.fileOpener2.open(url, "text/csv", {
                            error: function error(err) {
                              console.error(err);
                            },
                            success: function success() {
                              console.log("success with opening the file");
                            }
                          });
                        };

                        fileWriter.onerror = function(err) {
                          console.error(err);
                        };
                      },
                      function(err) {
                        console.log(blob)
                        // failed
                        console.error(err);
                      }
                    );
                  },
                  function(err) {
                    //error je bil kle
                    console.error(err);
                  }
                );
              },
              function(err) {
                alert("Unable to download");
                console.error(err);
              }
            );
          } else {
            saveAs(blob, filename);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    notification(message, color){
      if(this.$q.platform.is.desktop){
        this.$q.notify({
          message: message,
          color: color,
          position: "top"
        })
      }else{
        this.$q.notify({
          message: message,
          color: color
        })
      }
    },
    refresh(){
      this.$store.dispatch("SelectedExp/fetchData",this.$route.params.experiment).then(message =>{
        this.notification(message, "info")
      }).catch(error =>{
        this.notification(error, "negative")
      });
    }
  },
  computed: {
    title: {
      get() {
        return this.$store.state.SelectedExp.Title || "Eksperiment";
      },
      set(value) {
        this.$store.commit("SelectedExp/setTitle", value);
      }
    }
  }
};
</script>

<style lang="sass" scoped>
.title
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* number of lines to show */
  -webkit-box-orient: vertical;
</style>
