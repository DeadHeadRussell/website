local utils = import '../../utils.libsonnet';

utils.makeCategory('Old Projects', [
  import './cam_tapes.libsonnet',
  import './jazz_fun.libsonnet',
  import './covers.libsonnet',
  import './midi.libsonnet',
  import './epic.libsonnet'
])
