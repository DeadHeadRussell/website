local utils = import '../../utils.libsonnet';

utils.makeCategory('Old Bands', [
  import './cam_jervis.libsonnet',
  import './orfs.libsonnet'
])
