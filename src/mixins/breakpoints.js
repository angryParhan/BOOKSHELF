export const breakpoint = {
  data(){
    return {
      height: this.getClientHeight(),
      width: this.getClientWidth(),
      thresholds: {
        xs: 600,
        sm: 960,
        md: 1280,
        lg: 1920
      },
      scrollbarWidth: 16,
    }
  },
  computed: {
    xsOnly() {return this.width <= this.thresholds.xs},
    smOnly() {return this.width <= this.thresholds.sm && !this.xsOnly},
    smAndDown() {return (this.xsOnly || this.smOnly) && !(this.mdOnly || this.lgOnly || this.xlOnly)},
    smAndUp() {return !this.xsOnly && (this.smOnly || this.mdOnly || this.lgOnly || this.xlOnly)},
    mdOnly() {return this.width <= this.thresholds.md - this.scrollbarWidth && !(this.smOnly || this.xsOnly)},
    mdAndDown() {return (this.xsOnly || this.smOnly || this.mdOnly) && !(this.lgOnly || this.xlOnly)},
    mdAndUp() {return !(this.xsOnly || this.smOnly) && (this.mdOnly || this.lgOnly || this.xlOnly)},
    lgOnly() {return this.width <= this.thresholds.lg - this.scrollbarWidth && !(this.mdOnly || this.smOnly || this.xsOnly)},
    lgAndDown() {return (this.xsOnly || this.smOnly || this.mdOnly || this.lgOnly) && !this.xlOnly},
    lgAndUp() {return !(this.xsOnly || this.smOnly || this.mdOnly) && (this.lgOnly || this.xlOnly)},
    xlOnly() {return this.width > this.thresholds.lg - this.scrollbarWidth},
  },
  created() {
    if (typeof window === 'undefined') return;
    window.addEventListener('resize', this.onResize, { passive: true });
  },
  beforeDestroy() {
    if (typeof window === 'undefined') return;
    window.removeEventListener('resize', this.onResize);
  },

  methods: {
    onResize() {
      this.height = this.getClientHeight();
      this.width = this.getClientWidth();
    },
    getClientWidth() {
      if (typeof document === 'undefined') return 0;
      return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    },
    getClientHeight() {
      if (typeof document === 'undefined') return 0;
      return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    }
  }
}
