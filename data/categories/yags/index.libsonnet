local utils = import '../../utils.libsonnet';

utils.makeCategory('YAGS', [
  import './zags.libsonnet',
  import './yags.libsonnet'
])
