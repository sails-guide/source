<template>
  <section class="author-section">
    <hr />
    <h4>This article was written by</h4>
    <div class="author-block"
         v-for="(user, idx) of users"
         :key="`author-${idx}`">
      <div v-if="user.avatar_url" class="author-avatar">
        <img :src="user.avatar_url" :alt="`${user.name || user.login}'s GitHub avatar`" />
      </div>
      <div class="author-bio">
        <h3>{{ user.name || user.login }}</h3>
        <a :href="user.html_url" target="_blank">@{{ user.login }}</a>
        <blockquote class="bio-text" v-show="user.bio">{{ user.bio }}</blockquote>
      </div>
      <a class="biglink" :href="user.html_url" target="_blank"></a>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Author',

  props: {
    githubUsername: {
      type: String | Array,
      required: true
    }
  },

  data: () => ({
    users: []
  }),

  mounted () {
    if (this.githubUsername) {
      const users = Array.isArray(this.githubUsername) ? this.githubUsername : [this.githubUsername]
      for (const u of users) {
        this.loadGithubBio(u)
      }
    }
  },

  methods: {
    async loadGithubBio (username) {
      fetch(`https://api.github.com/users/${encodeURIComponent(username)}`)
        .then(res => {
          if (!res.ok) throw res
          return res.json()
        })
        .then(data => {
          this.users.push(data)
        })
        .catch(err => {
          console.error('Oof, failed to load user info from GitHub API', err)
        })
    }
  }
}
</script>

<style scoped>
.author-block {
  position: relative;
  display: flex;
  border-radius: 4px;
  margin: 10px 0;
  box-shadow: 0 10px 20px rgba(0,0,0,0.08), 0 6px 6px rgba(0,0,0,0.11);
  transition: all ease-in-out 0.15s;
  transform: translate3d(0, 0, 0);
}

.author-block:hover {
  transform: translate3d(0, -2px, 0);
  box-shadow: 0 12px 22px rgba(0,0,0,0.12), 0 8px 8px rgba(0,0,0,0.18);
}

.author-block > div {
  padding: 10px;
}

.author-avatar {
  width: 25%;
  max-width: 80px;
  display: flex;
  align-items: center;
}

img {
  border-radius: 50%;
}

h3 { margin: 0 }
h4 { margin-bottom: 0 }

.author-bio {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.bio-text {
  margin: 10px 0 0 0;
  padding: 0 0 5px 8px;
}

.biglink {
  position: absolute;
  height: 100%;
  width: 100%;
}
</style>